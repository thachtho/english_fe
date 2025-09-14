const BLOCKS = [
  { value: 6, label: 'Khối 6' },
  { value: 7, label: 'Khối 7' },
  { value: 8, label: 'Khối 8' },
  { value: 9, label: 'Khối 9' },
  { value: 10, label: 'Khối 10' },
  { value: 11, label: 'Khối 11' },
  { value: 12, label: 'Khối 12' },
];

const MENUS = [{
  id: 1,
  path: "/",
  name: "Trang chủ",
},
{
  id: 2,
  path: "",
  name: "Facebook",
  controlChildrens: [
    {
      id: 3,
      path: "/facebook-link",
      name: "Links",
    },
    {
      id: 4,
      path: "/facebook-comment",
      name: "Comments",
    }
  ]
},
{
  id: 5,
  path: "/token",
  name: "Token",
},
{
  id: 6,
  path: "/proxy",
  name: "Proxy",
},
]

const TITLE_PATH = [
  {
    path: '/',
    title: 'Trang chủ',
  },
  {
    path: 'facebook-link',
    title: 'Link FB',
  },
  {
    path: 'facebook-comment',
    title: 'Comment FB',
  },
  {
    path: 'token',
    title: 'Token',
  },
  {
    path: 'proxy',
    title: 'Proxy',
  },
]

export { BLOCKS, MENUS, TITLE_PATH };
