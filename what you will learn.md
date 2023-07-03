# 20/06/2023

0:00 Introduction
02:02 Next.js Crash Course (Why You Should Use Next?)
04:34 Next.js Installation
07:39 Next.js Folder Structure
08:50 Next.js Routing Tutorial (App Router)
15:35 Next.js Layouts and Components
23:50 Next.js Rendering Explained (Server side and Client side)
30:35 Next.js Styling (Global and Module CSS)
40:28 Next.js Image Explained
49:30 Next.js App UI Design
01:27:53 Next.js Dark/Light Mode Tutorial
01:33:02 Next.js Context API Tutorial (App Router)
01:38:55 Next.js Data Fetching Explained (Static, Dynamic)  
01:45:50 Next.js How to Fetch Data on the Client Side? (SWR Tutorial)
01:51:04 Next.js How to Fetch Data from Local Json File?
01:54:15 Next.js MongoDB Full Stack App Tutorial
02:02:16 Next.js API Folder and CRUD Operations (App Router)
02:11:14 Next.js SEO Tutorial (Static and Dynamic SEO)
02:14:45 Next.js Auth Tutorial (New App Router)
02:16:50 Next.js Google Auth (Sign in with Google)
02:25:15 Next.js Credentials Auth (Sign in with Email and Password)
02:45:16 Next.js Protected Routes with Auth.js
02:49:31 Next.js Admin Dashboard Tutorial
03:01:30 Next.js SWR Mutation
03:05:20 Outro

# 12:55 PM

skipped the desigining part 55:06, will focus on functionality part
now

# 3:40 PM

# data fetching

ON CLIENT SIDE

- fetch in useEffect
- using fetching library
  - react query
  - swr

// basically normal fetching

ON SERVER SIDE

- directly convert the component into async & fetch data using await
- Static Data Fetching, using fetch("url", {cache: "force-cache"}) // if your data never changes
- Revalidating Data, fetch("url", {revalidate: 10})
- Dynamic Data Fetching, fetch("url", {cache: "no-store"})

also it seems like you dont need to get to the api, ofc, you need to fetch data normaly, only use API folder if you are going to add backend to your code.

# 4:11, data fetching on SSR

i just realized that we dont even use useStates, to store data, we just

// create a get function

async function getData(){
//get data
}

const main = async () => {
const data = await getData(); //and boom there we have it, our data!!! TF man? it was really that easy? god damn lama dev godly!!!
}

# data fetching on CSR

forget the old method of fetching data using CSR, its time to fetch the data using react query

pros of react query:

- already has loading & error built in

cons of useEffect:

- you got to set up useStates & manually update the data using states... zzz

# next.js SWR hook

## full stack with next

soralearnscoding2022
9oHColDDhvxGnir4

## dark mode using useContext [very effective & easy to use - Lama dev the godz]

in global css set things that you want to be applied when on dark or light mode, then on context api file, make a toggleable switch button that you will make it trigger from toggle button on the toggleButton component.

## ERROR RESOLVED - 10:39 AM

OverwriteModelError: Cannot overwrite `Post` model once compiled.
so i was getting this error with no problem to the code & welp it turns out just like how i had expected, it was due to me not accessing the process.env.element not correctly using .env.local file name & using NEXT*PUBLIC*<VARIABLE_NAME>

## full stack with next

- create a utils folder to add yo database config => connect & stuff
- create a models folder to add all the models
- now with in app create api folder then add subfolders as you wish to do with the particular api, and thats how you set up huh?

const posts = fetch("blablabla.com");
NOTE: remember to turn files to JSON.stringify(posts)

also eslint is pretty good on telling you that the data that you have gotten from backend needs to be parsed, though it tells you in different ways it still tells you regardless & the message wont go unless you stringify it or do something about it

//Post.ts - api function
import Post from "@models/Post";
import connect from "@utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
try {
await connect();
const posts = await Post.find();
return new NextResponse(JSON.stringify(posts), { status: 200 }); //eslint error here!
} catch (error) {
return new NextResponse("Database Error!", { status: 500 });
}
};

//ERROR MESSAGE - ESLINT
Argument of type 'any[]' is not assignable to parameter of type 'BodyInit | null | undefined'.
Type 'any[]' is missing the following properties from type 'URLSearchParams': append, delete, get, getAll, and 3 more.ts(2345)

//BEFORE STRINGIFYING
{
\_id: new ObjectId("64927a9c87fad7e94ceb9da9"),
title: 'title test',
desc: 'desc test',
content: 'content test',
username: 'john doe',
img: 'https://images.pexels.com/photos/17216077/pexels-photo-17216077/free-photo-of-food-plate-wood-dawn.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
}

//AFTER STRINGIFYING
[{"_id":"64927a9c87fad7e94ceb9da9","title":"title test","desc":"desc test","content":"content test","username":"john doe","img":"https://images.pexels.com/photos/17216077/pexels-photo-17216077/free-photo-of-food-plate-wood-dawn.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}]

# 11:20, BRUH

- I still get error
  OverwriteModelError: Cannot overwrite `Post` model once compiled. wasnt it resolved already?

  seems like you resolve the issue like this
  export default mongoose.models.Post || mongoose.model("Post", postSchema);

## DONT GET CONFUSED over which & how you gonna get the ID!!!

- i am always confused on what id to get i should stop doing that, pass \_id from mongo db on map function and when getting values from params, just pass what you have named your [] as

//for map
data.map((data)=>(

  <div key={data._id}>{data.title}</div>
))

//for api inside api/Posts/[id]
async function getData(request, {params}: paramsType){
const {id} = params
}

when passing params to the api
const BlogPost = async ({ params }: paramsType) => {
const data = await getData(params.id);
}

# ERROR RESOLVED

- was getting error that said url parse failed
  turns out..
  http://localhost:3000/api/posts i had missed a ":" after http... GGs

but it was good in making me go through the code and see how things are going on anyway

## Next.js SEO

- things like changing your title & desc based on each of yo page, using metadata
  you can add it on either layout or page file.

just do
export const metadata = {
title: "Title of the Page",
description: "Description of the Page"
}

but one thing is, if you do it in layout, it will be applied to the entire nested sections of the page, but if you add on page then you will have to add on the individual page of the section.

## When to use layout in next.js

- so from the error i got, seems like layout is an obligation if you have nested components, but maybe not if you only have a single page

yup and all you need to add is just this much lines of code and you are done

//blogs
import { ChildrenType } from "@app/helper/types";

export const metadata = {
title: "Blogs",
description: "Welcome to the blog section of Sore Zore",
};

const BlogLayout = ({ children }: ChildrenType) => {
return <div>{children}</div>;
};

export default BlogLayout;

## DYNAMIC METADATA [requires a generate meatadata function]

export async function generateMetaData({params}){
const post = await getData(params.id)
return {
title: post.title,
description: post.desc,
};
}

//eslint error - when you dont resolve the promise
Property 'title' does not exist on type 'Promise<any>'

if there was no await then you would get this error when you try to assign post.title to title GGs!!!

and yeah, as expected the previous metadata from layout, gets overwritten by blogs/:id's metadata

### CONCLUSION on SEO

- if you have static website then you can use

export const metadata = {title: "", description: ""}

- if you have dynamic website then you can use

export async function generateMetadata(params){
const data = await getData(id);
return {
title: data.title,
description: data.description
}

}

## This is how you get data from useEffect vs fetcher

// const [data, setData] = useState<string[]>([]);
// const [isLoading, setIsLoading] = useState<boolean>(false);
// const [err, setErr] = useState<boolean>(false);

// useEffect(() => {
// const getData = async () => {
// setIsLoading(true);
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");

// if (!res.ok) {
// setErr(true);
// return notFound();
// }

// const data = await res.json();
// setData(data);
// setIsLoading(false);
// };
// getData();
// }, []);

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const { data, error, isLoading } = useSWR(
"https://jsonplaceholder.typicode.com/posts",
fetcher
);
console.log(data);

## Adding AUTH

- i still dont get how the authentication is working, looks like magic to me, but it is going on & they had said this about next, & i guess this is true, the authentication process goes on even when not used, i mean we have enveloped the entire children with sessionprovider but still, for it to be used on every thing like that... it looks like magic...

- but the worse thing is i am getting an error & i dont know where & how should i solve it,
- we get data or post api by exporting GET or POST function like this...
  export const GET = async (request, { params }: paramsType) => {
  const { id } = params;
  console.log(params);

  try {
  await connect();
  const post = await Post.findById(id);
  return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
  return new NextResponse("Database Error!", { status: 500 });
  }
  };

so when we dont export it as such we get error so to solve it we do this...

const handler = NextAuth({
providers: [
GoogleProvider({
clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
}),
],
});

export { handler as GET, handler as POST };

## ERROR - p-index.js:32 [next-auth][error][CLIENT_FETCH_ERROR]

then you need to add NEXTAUTH_URL =
but i am still getting errors... interesting

## AUTHENTICATION ERROR

12:11 PM
i am getting unexpectederrors when i exoprt NextAuth like this...

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
providers: [
GoogleProvider({
clientId: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGE_CLIENT_SECRET,
}),
],
// secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
});

next says i need to "specify" for each HTTP method so we import it like this

## Attempt 1

const handler = NextAuth({});
export {handler as GET, handler as POST},

CONC: this resolved the first issue, next js can use this file for GET & POST respectively, but i am getting an error that states;

[next-auth][error][CLIENT_FETCH_ERROR]

which occurs when you dont have NEXTAUTH_URL in your .env variables, but i have it on my .env variable, and still i am getting the error?? wtf?

'MISSING_NEXTAUTH_API_ROUTE_ERROR'

i am also getting this error & i still dont know what is up with these errors...
the only solution i found was to rename

api/auth/[...nextAuth] to api/auth/[...nextAuth], which i dont know what it means, regardless, i have that alright, and i am still getting that error... i wonder what should i even do next...

## Attempt 2

12:32, ohh man i am .. what the hell mannnnnnnnnnnnn
the error was that i wrote the name incorrectly... it was supposed to be
api/auth/[...nextauth]/route.js (with route.js's exports being as GET or POST)

but mine was
api/auth/[...nextAuth]/route.js ...just slight mistake in the letter and that was enough for me to face error like that, damn..

i mean they were saying that i needed to change my folder name maybe, and well well well, what do you know...

## Error - trying to login using OAuth [RESOLVED]

when i try to login it says try using different account

NEXTAUTH_SECRET = "ajfjoajLJOJ4645A4Fs4d5fs4dsaf4s5saf"
the error says

- 'client_secret_basic client authentication method requires a client_secret'
  do they mean secret after providers or client secret from google?

so the error was because i wasnt passing google client secret properly...
it was GOOGE_CLIENT_SECRET instead of GOOGLE_CLIENT_SECRET

now the login is successful and this is what i get

##### the authentication in next.js is hard man shit!!

so what did we do first for OAuth?

## OAuth

- we need a new file for SessionProvider - it should later wrap our entire application so that it can work all around our app
- then we need to create auth/[...nextauth]/route.ts/js for handling our login functions through google, then in login page, import signin from next-auth/react for any sigin functionality though out the app,

## Using normal credentials

now this is where it gets tough...

# register

//api/auth/register

- import models & connection to database, in your api/auth/register
- export POST function that takes in request from user
- then store the res data from the users in the const
- import bcrypt & hash the password data, from the user
- then in the model, create its instance & save the data into database using modelName.save() function then throw new NextResponse("User Has Been Created", {status: 201})
- else throw new NextResonse("Something went wrong", {status: 500})

//dashboard/(auth)/register/page

- you already have fields, pass them values at once using lama dev's technique
- try to pass the values to api/auth/register
- if you get no 201, which is our status, then router.push them to whatever place you want, else throw error, get router from useRouter from next/navigation

//api/auth/[...nextauth]

- import models, connetion to db, necessary google/github providers, bcrypt, next-auth & credentialsProviders and all other thing you need
- export the NextAuth function as POST or GET or anything that you will use, but generally only POST & GET
- NEXTAUTH

  - inside nextauth there are many layers but the authentication part only involves providers: [] part but to error handle you can add pages: {...options to handle what you need to handle}
    providers:[

    //for OAuth
    GoogleProviders:{
    clientId: pass client id from google console,
    clientSecret: pass client secret from google console
    }

    //for Normal Auths
    CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    async authorize(credentials) {
    //Check if the user exists.
    await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }

    },
    }),
    ]

and thats it for signing in using OAuth... but where we gonna check? i gues it is comming up... okay..

//dashboard/(auth)/login/page
//OAUTH
import signIn from next-auth/react
then use signIn on onClick function of the signin button to signIn onClick={()=>signIn("google")} //thats it for OAuth...

//Credintials tho...
using lamadev's method in handleSubmit function
submit the email & password using

async handleSubmit({
...
await signIn("credentials", {email, password})
})

//and thats it!

## SIGN OUT!!!

unironically, logging out is super easy.. just import signOut from next-auth/react
then onClick={signOut} and boom you are done bruh

### PROTECTING ROUTES

//conditional rendering
so like we had use useSession to check authenticated and unAuthenticated, we can do that once again to protect our routes & also add login/logout button based on that

//protecting routes
it is even easier.. go to the page you want to and just do this

const Dashboard = (props: Props) => {
const session = useSession();

const router = useRouter();
if (session.status === "loading") {
return <p>Loading...</p>;
}

if (session.status === "unauthenticated") {
router?.push("/dashboard/login");
}

return <div>Dashboard Page</div>;
};

its that easy babyYYY!!!!
also here when using return statement like that you cannot use fetcher below it, just like you wouldnt use useeffect below return statement

### FINALLY UPLOADING POSTS

so seems like we need fetcher to get the posts huh? interesting my guy!!

// also this is how we get user name? quite complex cuz i forgot how searchParams worked

export const GET = async (request) => {
const url = new URL(request.url);
const username = url.searchParams.get("username");

try {
await connect();
const posts = await Post.find(username && { username });
return new NextResponse(JSON.stringify(posts), { status: 200 });
} catch (error) {
return new NextResponse("Database Error!", { status: 500 });
}
};

## 23.06.2023 - 11:04 AM

able to add post function to actually post something,
also it seems like if the data i pass from here doesnt match the column name in the database, i cannot add the data, like if i have image column, but i typed img, it aint working mate.

11:32, we can post and the UI is complete, but there is a problem there & the problem is that we have to manually refresh to see what we have posted, so in order to change that we can...

11:47, therefore we use the mutate function of SWR
damn, once you call mutate like this in swr

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const { data, mutate, error, isLoading } = useSWR(
`api/posts?username=${session.data?.user.name}`,
fetcher
);

then on try block use
//
using vanilla fetch

try{
await fetch("/api/posts",{
method: "POST",
body: JSON.stringify({
name,
title,
username: session.data.user.name
})
})
mutate()
}

// using axios - its that simple with axios
try {
await axios.post("/api/posts", {
name, title, username: session.data.user.name
})
mutate()
}

and BOOM you are done!

## deleting is even easier,

- set up api to delete
- call the api with your event, boom deleted!

but remember to name your exports as DELETE & not delete, next js wont identify otherwise and throw this error "405 Method Not Allowed"

the video is over, but i guess i will add more, so lets create...

# Post section

- where you can see posts of all, but you need to be logged in to visit

# Individual post section

- where individual post is shown & only the uploader can edit it
- also this is the post where the user will go when clicked on post from dashboard

# Finally add update action on the individual page, if its the uploader...

- i.e. uploader's {username === session.data.user.name && <Update/>}

also to reset yo targeteventvalues (using lama dev's technique), just do this
e.target.reset(), and boom everything is reset bruv

## Update

- nevermind the posts page already made, its called blogs, and [id] is made as well

# beware when fetching data

- when ferching data using fetch,
  if you have not set the cache to no-cache after querrying, you will not be able to fetch futher data, because next data has already cached the data and it wont change its data, regardless of your actions.

##### now time to add update on our own mate

## then we will add formik to form validate each and every input fields
