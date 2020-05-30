export class Person {
  personId: string;
  firstName: string;
  lastName: string;
  occupation: string;
  bio: string;
  avatarUrl: string;
  pictureUrl: string;

  constructor(personId: string, firstName: string, lastName: string, occupation: string, bio: string, avatarUrl: string, pictureUrl: string) {
    this.personId = personId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.occupation = occupation;
    this.bio = bio;
    this.avatarUrl = avatarUrl;
    this.pictureUrl = pictureUrl;
  }
}
