const posts = {
  posts: [
    {
      avatarUrl: '/assets/img/avatar.png',
      owner: 'Michal Elyasaf',
      postedAt: '2021-04-19T12:59-0500',
      title: 'Does vacciniation Harm you kids?',
      text: 'The awesome world of Web3 is fascinating; however, there are so many acronyms that it may have you scratch ',
      imgUrl: 'https://static.dw.com/image/55942471_403.jpg',
      dest: '/post/1234',
      dataSrc: 'https://static.dw.com/image/55942471_403.jpg',
      fake: 70,
      fact: 60,
      isBookmarked: false,
    },
    {
      avatarUrl: '/assets/img/avatar.png',
      owner: 'Nave Segal',
      postedAt: '2022-03-21T12:59-0500',
      title: 'Israel killing palstines',
      text: 'The awesome world of Web3 is fascinating; however, there are so many acronyms that it may have you scratch ',
      imgUrl:
        'https://free-palestine.carrd.co/assets/images/gallery01/96c1520d.jpg',
      dest: '/post/1234',
      dataSrc:
        'https://free-palestine.carrd.co/assets/images/gallery01/96c1520d.jpg',
      fake: 70,
      fact: 60,
      isBookmarked: true,
    },
    {
      avatarUrl: '/assets/img/avatar.png',
      owner: 'Gal Fianas',
      postedAt: '2020-12-19T12:59-0500',
      title: 'Are you Ukrianes people are Antisematics',
      text: 'The awesome world of Web3 is fascinating; however, there are so many acronyms that it may have you scratch ',
      imgUrl:
        'https://cdnuploads.aa.com.tr/uploads/Contents/2021/05/29/thumbs_b_c_8a0ec3df3dce3bfa43d772512a644961.jpg',
      dest: '/post/1234',
      dataSrc:
        'https://cdnuploads.aa.com.tr/uploads/Contents/2021/05/29/thumbs_b_c_8a0ec3df3dce3bfa43d772512a644961.jpg',
      fake: 70,
      fact: 60,
      isBookmarked: false,
    },
  ],
}

const users = []

const comments = [
  {
    id: 1,
    body: 'First Comment',
    owner: 'Michal Elyasaf',
    ownerId: 1,
    parentId: null,
    createdAt: '1976-04-19T12:59-0500',
  },
  {
    id: 2,
    body: 'Nested Comment',
    owner: 'Naveh Mevorach',
    ownerId: 2,
    parentId: 1,
    createdAt: '1976-04-19T12:59-0500',
  },
  {
    id: 3,
    body: 'Second Comment',
    owner: 'Naveh Mevorach',
    ownerId: 2,
    parentId: null,
    createdAt: '1976-04-19T12:59-0500',
  },
  {
    id: 4,
    body: 'Nested Comment',
    owner: 'Naveh Mevorach',
    ownerId: 2,
    parentId: 3,
    createdAt: '1976-04-19T12:59-0500',
  },
]

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve(posts), Math.random() * 1000)
  })
}

export const getComments = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve(comments), Math.random() * 1000)
  })
}
