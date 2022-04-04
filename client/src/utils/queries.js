import { gql } from '@apollo/client';

export const GET_ME = gql
`
$create GraphQL query to be executed by Apollo Client
query me {
    me{
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}
`;