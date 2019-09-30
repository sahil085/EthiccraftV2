import { NbMenuItem } from '@nebular/theme';
import {UserService} from '../../../services/user.service';
import {AppUrl} from '../../../constants/AppUrl';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'College',
    icon: 'layout-outline',
    children: [
      {
        title: 'Create College',
        link: AppUrl.REGISTER_COLLEGE_ADMIN,
      },
      {
        title: 'List College',
        link: AppUrl.VIEW_COLLEGE_ADMIN,
      }
    ],
  },
  {
    title: 'Member',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Register Member',
        link: AppUrl.REGISTER_MEMBER,
      },
      {
        title: 'Quick Membership',
        link: AppUrl.SHORT_MEMBERSHIP_FORM,
      },
      {
        title: 'Pending Member List',
        link: AppUrl.PENDING_MEMBER_REQUEST,
      },
      {
        title: 'Member List',
        link: AppUrl.VIEW_MEMBER,
      }
    ],
  },
  {
    title: 'Assign Role',
    icon: 'keypad-outline',
    link: AppUrl.ASSIGN_ROLE
  }
];
