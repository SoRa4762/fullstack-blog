export type ChildrenType = {
  children: React.ReactNode;
};

export type ContextType = {
  toggle: string;
  theme: string;
};

export type paramsType = {
  params: { id?: number; category?: string };
};

export type ButtonType = {
  text: string;
  url: string;
};

export type CatItemType = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

export type NextAuthType = {
  providers: [
    GoogleProvider: {
      clientId: string;
      clientSecret: string;
    }
  ];
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  // json: () => void;
};

export type PostType = {
  _id?: string;
  title: string;
  img: string;
  desc: string;
  content: string;
};

export type PostContentType = {
  _id: string;
  username: string;
  image: string;
  title: string;
  desc: string;
  content: string;
};

export type BlogContentType = {
  _id: string;
  img: string;
  title: string;
  desc: string;
};
