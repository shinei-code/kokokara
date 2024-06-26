/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation(
    $filter: ModelSubscriptionLocationFilterInput
    $owner: String
  ) {
    onCreateLocation(filter: $filter, owner: $owner) {
      id
      lat
      lng
      address
      notes
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation(
    $filter: ModelSubscriptionLocationFilterInput
    $owner: String
  ) {
    onUpdateLocation(filter: $filter, owner: $owner) {
      id
      lat
      lng
      address
      notes
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation(
    $filter: ModelSubscriptionLocationFilterInput
    $owner: String
  ) {
    onDeleteLocation(filter: $filter, owner: $owner) {
      id
      lat
      lng
      address
      notes
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
