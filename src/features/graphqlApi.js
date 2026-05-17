import { createApi } from '@reduxjs/toolkit/query/react'

const graphqlBaseQuery = ({ baseUrl }) => async ({ body }) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await response.json()
  if (json.errors) {
    return { error: json.errors }
  }
  return { data: json.data }
}

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: graphqlBaseQuery({ baseUrl: 'http://localhost:5000/graphql' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        body: {
          query: `
            query GetPosts {
              posts {
                id
                title
                body
              }
            }
          `,
        },
      }),
    }),
    addPost: builder.mutation({
      query: (post) => ({
        body: {
          query: `
            mutation AddPost($title: String!, $body: String!) {
              addPost(title: $title, body: $body) {
                id
                title
                body
              }
            }
          `,
          variables: post,
        },
      }),
    }),
    getContacts: builder.query({
      query: () => ({
        body: {
          query: `
            query GetContacts {
              contacts {
                id
                name
                email
                mobileNumber
                message
                createdAt
              }
            }
          `,
        },
      }),
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        body: {
          query: `
            mutation AddContact($name: String!, $email: String!, $mobileNumber: String!, $message: String!) {
              addContact(name: $name, email: $email, mobileNumber: $mobileNumber, message: $message) {
                id
                name
                email
                mobileNumber
                message
                createdAt
              }
            }
          `,
          variables: contact,
        },
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetContactsQuery,
  useAddContactMutation,
} = graphqlApi
