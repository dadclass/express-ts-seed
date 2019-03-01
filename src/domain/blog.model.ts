class Blog {

    public constructor(
        private createdOn: Date,
        private title: string,
        private content: string,
        private imageUrls: string[]
    ) { }

    /* Sample json data
    {
        createOn: 2018-12-30,
        title: 'Marz blog title',
        content: 'God of Wars',
        imageUrls: [
            https://i.ytimg.com/vi/UaOchwLPZAs/maxresdefault.jpg,
            https://i.ytimg.com/vi/jOTlDMVZTMk/maxresdefault.jpg
        ],
        createOn: 2019-02-15,
        title: 'Tofu girl blog title',
        content: 'The Last of Us - Part 2',
        imageUrls: [
            https://i.ytimg.com/vi/qCyFN5d14oM/maxresdefault.jpg
        ]


    }
    */
}

export default Blog;