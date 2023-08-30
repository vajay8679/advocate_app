import React from 'react';
import { BiAlignLeft, BiHome, BiUser, BiShield, BiChat, BiCategory, BiFile, BiBookContent, BiFileBlank } from 'react-icons/bi';

const routesConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    messageId: 'sidebar.app.dashboard',
    type: 'item',
    icon: <BiHome />,
    url: '/dashboard',
  },
  // {
  //   id: 'category',
  //   title: 'Category',
  //   messageId: 'sidebar.app.category',
  //   type: 'item',
  //   icon: <BiCategory />,
  //   url: '/manage-categories',
  // },
  {
    id: 'case',
    title: 'Manage Cases',
    messageId: 'sidebar.manageCases',
    type: 'group',
    children: [
      // {
      //   id: 'bank',
      //   title: 'Court Case',
      //   messageId: 'common.courtCase',
      //   type: 'item',
      //   icon: <BiFileBlank />,
      //   url: '/manage-court-cases',
      // },


      // new
      {
        id: 'court-case',
        title: 'Court Case',
        messageId: 'common.courtCase',
        type: 'collapse',
        icon: <BiFile />,
        children: [
          {
            id: 'bank-recovery',
            title: 'Eminent(Bank Recovery)',
            messageId: 'sidebar.case.eminent',
            type: 'item',
            icon: <BiFileBlank />,
            url: '/manage-court-cases',
          },
          {
            id: 'motor-insurance',
            title: 'MACT(Motor Insurance)',
            messageId: 'sidebar.case.mact',
            type: 'item',
            icon: <BiFileBlank />,
            url: '/manage-court-cases-motor',
          },
        ]
      },

      // end


      {
        id: 'manage-bank-branches',
        title: 'Manage Pages',
        messageId: 'sidebar.app.manageBankInfo',
        type: 'collapse',
        icon: <BiFile />,
        children: [
          {
            id: 'bank',
            title: 'Bank',
            messageId: 'sidebar.app.bank',
            type: 'item',
            icon: <BiFileBlank />,
            url: '/manage-bank',
          },
          {
            id: 'bank-branch',
            title: 'Bank Branch',
            messageId: 'sidebar.app.bankBranch',
            type: 'item',
            icon: <BiFileBlank />,
            url: '/manage-bank-branch',
          },
        ]
      }
    ],
  },
  {
    id: 'content',
    title: 'Site Content',
    messageId: 'sidebar.content',
    type: 'group',
    children: [
      {
        id: 'manage-pages',
        title: 'Manage Pages',
        messageId: 'sidebar.app.managePages',
        type: 'collapse',
        icon: <BiFile />,
        children: [
          {
            id: 'pages',
            title: 'Pages',
            messageId: 'sidebar.app.pages',
            type: 'item',
            url: '/manage-pages',
          },
          {
            id: 'page-category',
            title: 'Page Category',
            messageId: 'category',
            type: 'item',
            url: '/manage-page-category',
          },
        ]
      },
      // {
      //   id: 'content',
      //   title: 'Manage Pages',
      //   messageId: 'sidebar.app.manageBlogs',
      //   type: 'collapse',
      //   icon: <BiBookContent />,
      //   children: [
      //     {
      //       id: 'blogs',
      //       title: 'Blogs',
      //       messageId: 'sidebar.app.blogs',
      //       type: 'item',
      //       url: '/manage-blogs',
      //     },
      //     {
      //       id: 'blogs-category',
      //       title: 'Blog Category',
      //       messageId: 'category',
      //       type: 'item',
      //       url: '/manage-blog-category',
      //     },
      //   ]
      // },
    ],
  },
  {
    id: 'manage-users',
    title: 'Users & Access',
    messageId: 'sidebar.userAndAccess',
    type: 'group',
    children: [
      {
        id: 'users',
        title: 'Manage User',
        messageId: 'sidebar.manageUser',
        type: 'item',
        icon: <BiUser />,
        url: '/manage-users',
      },
      // {
      //   id: 'manage-roles',
      //   title: 'Roles',
      //   messageId: 'sidebar.authorization.role',
      //   type: 'item',
      //   url: '/manage-roles',
      //   icon: <BiShield />,
      // },
    ],
  },
];
export default routesConfig;
