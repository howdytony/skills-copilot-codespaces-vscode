function skillsMember() {
  return {
    name: 'skillsMember',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        faker: 'name.findName',
      },
      avatar: {
        type: 'string',
        faker: 'image.avatar',
      },
      skills: {
        type: 'array',
        minItems: 3,
        maxItems: 5,
        uniqueItems: true,
        items: {
          type: 'string',
          faker: 'lorem.word',
        },
      },
    },
  };
}