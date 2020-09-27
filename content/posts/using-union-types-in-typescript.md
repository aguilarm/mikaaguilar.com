---
title: "Using Union Types in TypeScript"
date: 2020-09-22
lastmod: 2020-09-22
description: "How to effectively use union types in TypeScript."
draft: false
---

In recent projects, my team has been using a [relatively strict TypeScript config](https://gist.github.com/aguilarm/401309435c119bbeba591aee2f63cd3e), 
and it's been excellent. 

A common scenario for us is a need for a union type that we need to perform different actions at *runtime*. 
For example, we often have a `CurrentUser` object that can either be loading, authenticated, or anonymous.

Because we're using mostly static pages with a detatched auth system (primarily Firebase), systems that
require user information on the frontend need to account for a short period where the user is loading before doing anything.

The Typescript handbook has a really nice section about [discriminating unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions) 
that is definitely worth checking out. I noticed that the example, with a string matched key, could be 
improved just a little more using an enum to make IDE usage searches easy.

In the case of the `CurrentUser`, the full type declaration looks something like this:

```typescript
export enum UserTypes {
  Authenticated,
  Anonymous,
}

export type AuthenticatedUser = {
  userType: UserTypes.Authenticated;
  displayName: string;
  email: string;
  logout(): Promise<void>;
};

export type AnonymousUser = {
  userType: UserTypes.Anonymous;
  isPremium: false;
  login(userName: string, password: string): Promise<void>;
};

export type CurrentUser = AuthenticatedUser | AnonymousUser | null;
```

This is great for two reasons:
1. You can easily look for usages of Authenticated or Anonymous users via the enum.
2. Usages of the `CurrentUser` type will need to handle `null`, which occurs during loading.

That means, a possible use of the `CurrentUser` type would look like

```typescript
if (currentUser?.userType === UserTypes.Authenticated) {
    // Do things an authenticated user can do, like logout
    currentUser.logout();
}
```

We're passing our CurrentUser around a NextJS (React) app using React context. I think this has made user related
code super clean and easy to read.

Perhaps we'll need to handle 'loading' with more information than `null`, but so far is sufficient in usages 
and seems relatively clear. The possible `Error` state will be handled by the function that hooks this up to 
our authentication provider which throws the app into an error state early. That may also be a good candidate
for an addition to the union type should we decide to push that responsibility further into the usages.
