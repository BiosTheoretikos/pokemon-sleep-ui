import {NavEntryLink} from '@/types/nav';


export const navEntryForItem: NavEntryLink[] = [
  {
    type: 'link',
    href: '/item/evolution',
    imageSrc: '/images/generic/flash.png',
    i18nTextId: 'Item.Evolution.Title',
  },
  {
    type: 'link',
    href: '/item/incense',
    imageSrc: '/images/generic/incense.png',
    i18nTextId: 'Item.Incense.Index.Title',
    disabled: true,
  },
];
