import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 5,
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt text'}
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
        },
      ],
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      title: 'Highlights',
      of: [
        {
          type: 'object',
          name: 'highlight',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'copy', type: 'text', title: 'Copy', rows: 3},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      subtitle: 'location',
    },
  },
})

