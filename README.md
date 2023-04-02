# The Linguistic Backend Challenge

If you're reading this, you've already been given instructions :wink:

# Build & Run
## Locally
The program can be executed locally with:

```shell
 # Using ci for this example to prevent the resolved packages changing from what I tested with.
 # npm install would also work, but wouldn't guarantee minor versions of dependencies would not have updated
npm ci
npm run start
```

## Docker
The server can also be built and run with docker; the commands to do so are provided in the code block below.
I've included a `.dockerignore` file to prevent docker cache misses on builds from files that don't affect the
running server as well as preventing the common mistake of accidentally copying over the local `node_modules` 
directory instead of using the one created by the `npm ci` command. 
I've also used separate command steps to copy the dependency definitions & downloads as their own step, 
which greatly improves build times when only the code has changed.


```shell
docker build -t ryansmith .
# run with `-it` so process can be killed with ctrl-c
# run with `--rm` to not clutter user's cache 
docker run -p 3000:3000 --rm -it ryansmith
```

## Test mutations & queries

```graphql
mutation insertDocumentOne {
    saveDocument(
        documentData: {
            text: "Деякі тестові дані"
            title: "Зразок назви для користувача 1"
            userId: 1
        }
    ) {
        createdAt
        updatedAt
        id
        text
        title
        userId
    }
}

mutation insertDocumentTwo {
    saveDocument(
        documentData: {
            text: "一些测试数据"
            title: "用户 1 的示例标题"
            userId: 1
        }
    ) {
        createdAt
        updatedAt
        id
        text
        title
        userId
    }
}

mutation insertDocumentTwo {
    saveDocument(
        documentData: {
            text: "We can insert data for multiple users"
            title: "Sample title for user 2"
            userId: 2
        }
    ) {
        createdAt
        updatedAt
        id
        text
        title
        userId
    }
}

query userQuery {
    user(id: 2) {
        id
        email
        documents {
            title
        }
    }
}

query documentQuery {
    documents(userId: 2) {
        title
        text
        userId
    }
}
```

# Implementation notes

In order to create the new documents, I updated `schema.prisma` with the appropriate columns and references.
I also created the corresponding nest modules/services/models to go with. The nestjs community seems to lean
towards using plural names for resources, but since the provided `user` resource was already singular, I went
with `document` to keep the style the same.

Never having worked with nestjs before, I found the resolver/service approach it takes to be pretty single and 
straight forward and the dependency injection to "just work" for simple cases. I briefly looked at adding a
"user" field to the document graphql response type, but decided dealing with the circular references wasn't worth
it. I would probably take the approach of not implementing it in production until we had a need for it, but thankfully
nestjs _does_ provide a way to handle circular references if necessary.

As a personal note, `user` already uses an autoincrementing numeric primary key. My personal experience have lead me
to prefer UUID id's instead. I didn't go with it for the documents table to keep the style the same as what already exists,
but I've seen many a data analyst join tables incorrectly and have it appear to work due to rows with the same numeric
ID just happen to exist. With the unique nature of UUID's, the joins don't return data if the joins are done incorrectly
which helps prevent this entire class of data analysis bugs.

I had to update the `start:prod` command in `package.json` because the outputted build file from the typescript
compiler was going into `dist/src/`, not directly in `dist` as it was specifying. I could have updated the tsconfig
to move the file instead and there's no strong reason to pick one over the other that I could see.