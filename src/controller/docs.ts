import {ObjectId} from 'bson';
import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import {throwIfNotCmsMod} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {DocsData, DocsDataEditable, DocsDataEditableFetched, DocsDataFetched} from '@/types/mongo/docs';
import {Locale} from '@/types/next/locale';
import {getMigratedDocs} from '@/utils/migrate/docs/utils';


const getCollection = async (): Promise<Collection<DocsData>> => {
  const client = await mongoPromise;

  return client
    .db('docs')
    .collection<DocsData>('content');
};

type UploadDocOpts<TDoc> = ControllerRequireUserIdOpts & {
  doc: TDoc,
};

export const addDoc = async ({executorUserId, doc}: UploadDocOpts<DocsDataEditable>) => {
  throwIfNotCmsMod(executorUserId);

  return (await getCollection()).insertOne(getMigratedDocs(doc));
};

export const updateDoc = async ({executorUserId, doc}: UploadDocOpts<DocsDataEditableFetched>) => {
  throwIfNotCmsMod(executorUserId);

  // View count is extracted to avoid overwriting
  const {viewCount, ...migrated} = getMigratedDocs(doc);

  return (await getCollection()).updateOne(
    {_id: new ObjectId(doc.id)},
    {$set: {...migrated, lastUpdatedEpoch: Date.now()} satisfies Omit<DocsData, 'viewCount'>},
  );
};

type DeleteDocOpts = ControllerRequireUserIdOpts & Pick<DocsData, 'locale' | 'path'>;

export const deleteDoc = async ({executorUserId, locale, path}: DeleteDocOpts) => {
  throwIfNotCmsMod(executorUserId);

  return (await getCollection()).deleteOne({locale, path});
};

type GetDocBySlugOpts = {
  locale: Locale,
  slug: string[],
  count: boolean,
};

export const getDocBySlug = async ({locale, slug, count}: GetDocBySlugOpts): Promise<DocsDataFetched | null> => {
  const doc = await (await getCollection()).findOneAndUpdate(
    {locale, path: slug.join('/')},
    {$inc: {viewCount: count ? 1 : 0}},
  );

  if (!doc) {
    return null;
  }

  return {
    id: doc._id.toString(),
    createdEpoch: doc._id.getTimestamp().getTime(),
    ...getMigratedDocs(doc),
  };
};

export const getDocBySlugForEdit = async (
  opts: Omit<GetDocBySlugOpts, 'count'>,
): Promise<DocsDataEditableFetched | null> => {
  const doc = await getDocBySlug({...opts, count: false});

  if (!doc) {
    return null;
  }

  // Explicit to avoid returning additional property
  const {
    id,
    locale,
    path,
    title,
    content,
    showIndex,
  } = doc;

  return {id, locale, path, title, content, showIndex};
};

export const getDocsPathList = async (locale: Locale): Promise<string[]> => {
  const docs = await getDataAsArray(getCollection(), {locale});

  return docs.map(({path}) => path);
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({locale: 1, path: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize documentation index', e));
