import { ChildrenType } from "@app/helper/types";

export const metadata = {
  title: "Blogs",
  description: "Welcome to the blog section of Sore Zore",
};

const BlogLayout = ({ children }: ChildrenType) => {
  return <div>{children}</div>;
};

export default BlogLayout;
