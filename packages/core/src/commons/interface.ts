export interface Taggable {
  /* Array of strings which holds tags of the instance */
  tags: string[];
}

export interface TimeStampable {
  /* Date object to hold when the object is created. */
  createdAt: Date;

  /* Date object to hold when the object is updated. */
  updatedAt: Date;
}
