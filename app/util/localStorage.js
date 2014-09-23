Ext.define('MediaSpace.util.localStorage', {
       singleton : true,
 
        config : {
            baseUrl : 'http://sureshdotariya.blogspot.com/',
            imageUrl: 'http://sureshdotariya.blogspot.com/image.png',
            url : null,
            playing:false,
            fileCount : 0
        },
 
        setMedia: function(media) {
            this.media=media;
        },

        getfileCount:function()
        {
            this.fileCount=this.fileCount+1;
            return this.fileCount;
        },

        setFlag:function(flag)
        {
            this.playing=flag;
        },

        isPlaying:function()
        {
            return this.playing;
        },

        setUrl:function(url)
        {
            this.url=url;
        },

        getUrl:function()
        {
            return this.url;
        }
});