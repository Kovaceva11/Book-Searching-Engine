import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
          _id
          username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
  }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($book: ParameterInput!) {
        saveBook(input: $book) {
            username
            email
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      username
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
      }
      _id
      email      
    }
  }
`;