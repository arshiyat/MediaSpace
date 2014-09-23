Ext.define('MediaSpace.controller.controller', {
    extend: 'Ext.app.Controller',

   
    config: {

        store       :        null,
        record      :        null,
        media       :        null,
        mediaStatus :        null, 
        sheetpanel  :        null,
        fe          :        null,
        fs          :        null, 
        
        refs: {
            
            main:'main',
            mainView:'mainview',
            settingsviewPanel:'setttingview',
            filterviewPanel:'filterview',
            metaDataPanel:'viewMetaData',

            camera: 'mainview > #widgets > #camera' ,
            video: 'mainview > #widgets > #video' ,
            note: 'mainview > #widgets > #note' ,
            audio: 'mainview > #widgets > #audio',
            filterButton: 'mainview > #widgets > #filter',

            sortButton:'mainview > #widgets > #sort',
            settingsButton: 'mainview > #mediaBar > #settingButton',
            gridViewButton:'mainview > #mediaBar > #changeView',
            listView:'mainview > #capturelist',
            gridView:'mainview > #gridView',
            emptyPanel: 'mainview > #emptyPanel',

            settingsBackButton: 'setttingview >#settingsBar >#SettingsBackbutton',
            filterBackButton:'filterview >#filterToolbar >#filterBackbutton',
            settingslist:'setttingview >#settingslist',

            
            componentview:'view',
            cmp:'view >#htmlCmp',
            textcmp:'view >#note',
            savebutton:'view >#save',
            capturedetailsButton:'view >#capturedetailsButton',
            buttonCmp:'view >#buttonPanel',
            stop:'view >#buttonPanel >#stop',
            play:'view >#buttonPanel >#play',
            backbutton:'view >#titlebarInfo >#backButton',
            deletebutton: 'view >#titlebarInfo >#deleteButton',

            backMetaDataButton:'viewMetaData >#titlebarInfo >#metaDataBackButton',
            htmlMetaComp:'viewMetaData >#htmlMetaDataCmp',
           
        },

        control: {

            camera: {
                tap: 'onCamera' 
            },
            video:{
                tap:'onVideo'
            },

            note:{
                tap:'onNote'
            },

            audio:{
                tap:'onAudio'
            },

            sortButton:{
                tap:'onSort'
            },

            backbutton:{
                tap:'onBackButton'
            },

            filterButton:{
                tap:'onFilterButton'
            },

            listView:{
                itemtap:'itemTapped'
            },

            gridView:{
                  itemtap:'itemTapped'
            },

            settingslist:{
                itemtap:'settinglistTapped'
            },

            stop:{
                tap:'onStop'
            },

            play:{
                tap:'onPlay'
            },

            deletebutton:{
                tap:'onDeleteButton'
            },
            settingsButton:{
                tap:'onSettingButton'
            },

            gridViewButton:{
                tap:'onChangeView'
            },

            textcmp:{
                keyup:'onTextChange'
            },

            savebutton:{
                tap:'onNoteSave'
            },

            settingsBackButton:{
                tap: 'onSettingsBackButton'
            },

            filterBackButton:{
                tap: 'onFilterBackButton'
            },
            capturedetailsButton:{
                tap:'onInfoButton'
            },

            backMetaDataButton:{
                tap:'onMetaDataViewPanelBack'
            }
        }
    },

    onCamera:function()
    {
        var me=this;

        try{
 
        var captureSuccess = function(mediaFiles) {
            {
                emptyPanel.hide();
                me.moveAndRenameFile(mediaFiles,'Image');
            }

        };
      
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        var emptyPanel=this.getEmptyPanel();

        navigator.camera.getPicture(captureSuccess, captureError, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URL });
        }
        catch(E)
        {
            alert('caught exception '+E.toString());
        }

    },

    onVideo:function()
    {
        var me=this;
        try{
        var captureSuccess = function(mediaFiles) {
        
            var path = 'file://'+mediaFiles[0].fullPath;

            if(path.length>0)
            {
                emptyPanel.hide();
                me.moveAndRenameFile(path,'Video');
            }
        };

        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        var emptyPanel=this.getEmptyPanel();

        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
        }
        catch(E)
        {
            alert('caught exception '+E.toString());

        }

    },

    onNote: function(button, e, eOpts)
    {
        try{
        var me=this;
        if (!button.sheet) {
            //action sheet are essentially used to have some buttons for specific usage
            button.sheet = Ext.widget('sheet', {
            // html: 'Some text inside of the sheet', 
           // style: 'color: white; font-weight: bold', 
            // stretchX: true, stretchY:true,
            height: window.innerHeight,
            width: window.innerWidth,
            hideOnMaskTap: true,
            layout:'vbox',
            scrollable: true,
            items:[
            {
                xtype: 'textareafield',
                id:'note',
                label: 'Note',
                maxRows: 10,
                flex:1,
                // maxHeight:'80%'
            },
            {
                xtype:'button',
                text: 'Save',
                listeners: {
                tap: function (btn, e, eOpts) { 
                    
                    var fe,fileName;

                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

                     function gotFS(fileSystem) {
                        
                        var d = new Date();

                        fileName='Note-'+d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'-'+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()+'.txt';

                        fileSystem.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, fail);
                        // var path="resources/icons/notes.png"
                    }

                    function gotFileEntry(fileEntry) {
                        me.setFe(fileEntry);
                       
                        fileEntry.createWriter(gotFileWriter, fail);
                    }

                    function gotFileWriter(writer) {
                        
                        //get the text from the text box
                        var note=Ext.getCmp('note').getValue();
                        writer.write(note);

                        var path="resources/icons/notes.png"

                        // var store=Ext.getStore('myStoreID');

                        var sampleDate = new Date();
                        // var formated = Ext.Date.format(sampleDate,'d-m-Y');

                        me.getStore().add({ title: 'white', type: 'Note', url: path ,srcUrl: fileName,dateStamp: sampleDate });

                        me.getStore().sync();
                        me.getEmptyPanel().setHidden(true);


                    }

                    function fail(error) {
                        console.log(error.code);
                        alert('failed');
                    }

                    button.sheet.hide();
                } }
            },
            {
                xtype:'button',
                text: 'Cancel',
                // flex:1,
                listeners: {
                tap: function (btn, e, eOpts) { button.sheet.hide();
                    } }
            }]
            });
        
            Ext.Viewport.add(button.sheet);
        }//end of if
    button.sheet.show(); 
    }catch(E)
    {
        alert('caught exception '+E.toString());
    }
    },

    onAudio: function()
    {

        try{
           var emptyPanel=this.getEmptyPanel();
           var me=this;

            var captureSuccess = function(mediaFiles) {
                
                var path = 'file://'+mediaFiles[0].fullPath;

                emptyPanel.hide();

                me.moveAndRenameFile(path,'Audio');

                // var sampleDate = new Date();
                // // var formated = Ext.Date.format(sampleDate,'d-m-Y');

                // me.getStore().add({ title: 'yellow', type: 'Audio', url: 'resources/icons/audio.jpeg', srcUrl: "file://"+path, dateStamp: sampleDate });
                // me.getStore().sync();

            };

            // capture error callback
            var captureError = function(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            };

            // start audio capture
            navigator.device.capture.captureAudio(captureSuccess, captureError);
        }
        catch(E)
        {
            alert('caught exception '+E.toString()); 
        }
    },
 
    launch: function()
    {
        try{
            this.setStore(Ext.getStore('myStoreID')); 
           

            // this.getStore().load();
            // this.getStore().removeAll();

            // this.getStore().sync();

            // this.getStore().load();

            //  alert('count is '+this.getStore().getCount());

            this.getStore().load();

            if(this.getStore().getCount()==0)
            {
                this.getEmptyPanel().show();
            }

            this.sortFlag=false;

            //get the fileSystem 
            this.initFileSystem();

        }catch(E)
        {
            alert('Exception caught '+E.toString());
        }
    },

    //initialize the file system handler
    initFileSystem: function()
    {
        // var me=this;
        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        // function gotFS(fileSystem) {
        //     me.setFs(fileSystem);
        // }

        // function fail(error) {
        //     alert('failed with error'+error.code);
        // }
    },

    init:function()
    {

    },

    onFilterButton: function(button,e,eOpts)
    {

        var me=this;

        var datePicker = Ext.create('Ext.picker.Date', {
            yearFrom: 2000,
            yearTo  : 2015,
            value: new Date(),
            useTitles: false,
            modal:true,
            slotOrder:["year", "month"],

            listeners: {
                    change: function (value, eOpts) {

                        try{
                            me.filterStore(eOpts.getMonth(),eOpts.getFullYear());
                        }
                        catch(E)
                        {
                            alert('Exception caught with code '+E.toString());
                        }
                    }, 
                    cancel: function (picker) {
                        // Ext.Msg.alert('You hit cancel', '');
                    }
                    } 

        });
        Ext.Viewport.add(datePicker);
        datePicker.show();
    },

    filterStore: function(month,year)
    {
        // alert('calling the filter store with '+month + 'year'+year);
        this.getStore().clearFilter();
        this.getStore().filterBy(function(rec,id){
            if(rec.get('dateStamp').getMonth()==month && rec.get('dateStamp').getFullYear()==year)
            {
                return true;
            }
            return false;
        });
    },


    changeIconOnButtonTap: function(button, e, eOpts)
    {
        try{
            if (button.getIconCls()==='icon-list')
            {
                //default view
                button.setIconCls('icon-grid-alt');
                this.getListView().show();
                this.getGridView().hide();
            }
            else{
                button.setIconCls('icon-list');
                //show grid view
                this.getGridView().show();
                this.getListView().hide();
            }
        }catch(E)
        {
            alert('Exception caught '+E.toString());
        }


    },

   

    itemTapped:function(list, index, target, record, e, eOpts)
    {
        try{
            var record=this.getStore().getAt(index);
            var me=this;
            this.setRecord(record);

            var type=this.getRecord().get('type');
            var url=this.getRecord().get('srcUrl');
            // url=url.substring(5);

            this.getButtonCmp().hide();
            this.getTextcmp().hide();
            this.getTextcmp().setValue('');
            this.getCmp().show();
            this.getSavebutton().hide();

            var htmlstr;

            // alert('url i s'+url);

            if(type==='Image'){
                htmlstr='<img width="100%" height="100%" src="'+url+'" />'; 
                this.getCmp().setHtml(htmlstr);
                this.getMetaData(url);

            }
            else if(type==='Video'){

                htmlstr='<video id="video" controls preload="none" width="100%" height="200"> <source src="'+url+'" type="video/mp4"/></video>';
                // htmlstr='<video id="video" controls width="100%" height="200"> <source src="/mnt/sdcard/DCIM/Camera/video-2014-04-23-16-16-46.mp4"  type="video/mp4"  /></video>';

                // var video = document.getElementById('video');
                // alert("video" +video);
                 // video.play();
                this.getCmp().setHtml(htmlstr);
                this.getMetaData(url);


            }
           else if(type==='Audio')
           {

               htmlstr='<img src="resources/icons/audio.jpeg" align="middle" width="50%" height="30%" />';
               //video can be played using the media phongap api.
               //we have to have the buttons on the component to play stop and pause.
               // str='<button type="button" >Click Me!</button>";
               // this.getCmp().setHidden(true);
               this.getButtonCmp().show();

               var media=new Media(url.substring(6), function(){'success'}, function(e){alert('Cannot play the audio '+e.message)},
                function(status){
                    // alert('media status callback'+status);
                    me.setMediaStatus(status);
                    // alert('After the status set '+me.getMediaStatus());
                });
               this.setMedia(media);
               this.setMediaStatus(1);
               this.getCmp().setHtml(htmlstr);
               this.getMetaData(url);

           }
           else if(type==='Note')
            {
                //Hide the html component and display the text area compnent
                this.getCmp().hide();
                this.getTextcmp().show();
                //display the text area component

                this.showNote();
            }

        // this.getMain().on('deactivate',function(oldcard){oldcard.destroy()});

       this.getMain().animateActiveItem(1,{ type: 'slide', direction: 'right' });

            // this.getMain().setActiveItem(1);
        }
        catch(E)
        {
             alert('caught exception '+E.toString());
        }
    },

    showNote: function()
    {
        try{
            var main=this.getMain();
            var comp=this.getTextcmp();
            var me=this;
            var compCaptureDetails=this.getHtmlMetaComp();
            var filename;


            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            var filesrc=this.getRecord().get('srcUrl');

            function gotFS(fileSystem) {
                fileSystem.root.getFile(filesrc, null, gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                filename=fileEntry.name;

                me.setFe(fileEntry);
                fileEntry.file(gotFile, fail);
                fileEntry.getMetadata(success, failed);
             }

            function failed(error) {
                alert('Failed to get the metadata with error'+error.code);
                
                compCaptureDetails.setHtml('Captured Details unavailable');
                 // navigator.notification.alert('Filed to get metadata with Error code '+error.code, null, 'Metadata');
            };

            function success(metadata)
            {
                var htmlStr='<p>File name ::'+filename+'</p>';
                htmlStr=htmlStr+ '<p>Modified Date is ::'+metadata.modificationTime+'</p>';
                compCaptureDetails.setHtml(htmlStr);
            }   

            function gotFile(file){
                readAsText(file);
            }

            function readAsText(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    comp.setValue(evt.target.result);
                    main.setActiveItem(1);
                };

                reader.readAsText(file);
            }
            function fail(error) {
                alert('failed with error'+error.code);
            }
        }catch(E)
        {
             alert('caught exception '+E.toString());
        }

    },

    onTextChange:function()
    {
        //when the user changes the note then show the save button
        this.getSavebutton().show();
    },

    onStop:function()
    {
        //get the play back value to know the status of the audio being played.
         // alert('media status is(stop) '+this.getMediaStatus());
        if(this.getMedia())
        {
            if(this.getMediaStatus()==2 || this.getMediaStatus()==3)//running or paused
            {
                this.getMedia().stop();
                 this.getPlay().setText('Play'); 

            }
        }

    },

    onPlay:function()
    {
        /*
        Media.MEDIA_NONE = 0;
        Media.MEDIA_STARTING = 1;
        Media.MEDIA_RUNNING = 2;
        Media.MEDIA_PAUSED = 3;
        Media.MEDIA_STOPPED = 4;
        */
        try{
            // alert('media status is '+this.getMediaStatus());
            if(this.getMedia())
            {   
                if(this.getMediaStatus()==0)
                {
                    return;
                }

                if(this.getMediaStatus()==1 || this.getMediaStatus()==4)//not running/starting
                {
                    this.getMedia().play();
                    this.getPlay().setText('Pause');//next possible button should be pause
                }

                else if(this.getMediaStatus()==2 )//running status
                {
                    this.getMedia().pause();
                    this.getPlay().setText('Play');  // next possible button should be play
                }
                else if(this.getMediaStatus()==3 )//paused
                {
                    this.getMedia().play();
                    this.getPlay().setText('Pause'); 

                }
            }
        }catch(E)
        {
             alert('caught exception '+E.toString());
        }
       
    },

    onBackButton:function()
    {
        try{
            if(this.getMedia() && (this.getMediaStatus()==2 || this.getMediaStatus()==3))//playing or paused 
            {
                this.getMedia().stop();
                this.getPlay().setText('Play'); 
            }

            //clear the text box and reinitialize.
            this.getTextcmp().setValue('');

            this.getMain().on('deactivate',function(oldcard){alert('destryoing'+oldcard.name);oldcard.destroy()});
            this.getMain().animateActiveItem(0,{ type: 'slide', direction: 'left' });

            // this.getMain().setActiveItem(0);
        }
        catch(E)
        {
             alert('caught exception '+E.toString());
        }
    },

    onDeleteButton:function()
    {
        // //look for the file and delete it. Refresh the list
       try{
            var me=this;

            if(this.getFe()!=null)
            {
                this.getFe().remove(success, fail);
            }

            function success(entry) {
                
                me.getStore().remove(me.getRecord());

                me.getStore().sync();

                navigator.notification.alert("Media Removed", function(){}, "Confirm");

                me.onBackButton();

            }

            function fail(error) {
                alert('Error removing file: ' + error.code);
            }
        }
        catch(E)
        {
             alert('caught exception '+E.toString());
        }


    },

    getMetaData:function(url)
    {
        try{
            //url is the url of the file whose metadata needs to be found.
            var compCaptureDetails=this.getHtmlMetaComp();
            compCaptureDetails.setHtml('Capture Information unavailable..');

            var filename;

            var me=this;

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            // alert('captured url'+url);

            function gotFS(fileSystem) {
                // window.resolveLocalFileSystemURI(url, gotImageURI, fail);
                // fileSystem.root.getFile('file://var/mobile/Applications/663F14F8-67B0-4143-8363-DBDC54107A85/tmp/photo_005.jpg', null, gotFileEntry, fail);
                // fileSystem.root.getFile(url, null, gotFileEntry, fail);


                // window.resolveLocalFileSystemURI("file://"+url, gotFileEntry, fail);
                window.resolveLocalFileSystemURI(url, gotFileEntry, fail);


            };

            // function gotImageURI (fileEntry) {
            //     alert('file entry in got image uri');
            //     fileEntry.getMetadata(success,fail);
            // }

            function gotFileEntry(fileEntry) {
                me.setFe(fileEntry);
                filename=fileEntry.name;
                // alert('got file entry');
               fileEntry.getMetadata(success, fail);
               // fileEntry.remove(success1, fail);

               // function success1(entry)
               // {
               //  alert('removed.. now check');
               // }
            };

            function fail(error) {
                alert('Failed to get the metadata with error'+error.code);
                compCaptureDetails.setHtml('Captured Details unavailable');
                 // navigator.notification.alert('Filed to get metadata with Error code '+error.code, null, 'Metadata');
            };

            function success(metadata)
            {
                var htmlStr='<p>File name ::'+filename+'</p>';
                htmlStr=htmlStr+ '<p>Modified Date is ::'+metadata.modificationTime+'</p>';
                // alert(compCaptureDetails.getHtml());
               compCaptureDetails.setHtml(htmlStr);
            }
        }catch(E)
        {
            alert('caught exception '+E.toString());
        }   

    },

    //Move the media file and rename
    moveAndRenameFile: function(mediaUrl,type)
    {
        try{
        var me=this;
        
        var de;
        var fs;
        var oldFileEntry;

        var sampleDate = new Date();

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        function gotFS(fileSystem) {
            fs=fileSystem;
            window.resolveLocalFileSystemURI(mediaUrl, gotFileEntry, fail);
        };

            function gotFileEntry(fileEntry) {

                try{
                    var d = new Date();
                    var dirName='MediaStore/'+d.getFullYear()+d.getMonth()+d.getDate()+'/';

                    var fileName=d.getTime()+mediaUrl.substr(mediaUrl.lastIndexOf('.'));
                    fs.root.getDirectory('MyDairy/', {create: true}, function(dirEntry) 
                    { 
                        fileEntry.moveTo(dirEntry, fileName,  movedImageSuccess, fail);
    
                    }, fail);
               
                }
                catch(Ex)
                {
                    alert('caught'+Ex.toString());
                }

            };

             function movedImageSuccess(fileEntry) {
                try{
                    me.getStore().add({ title: 'green', type: type, url: fileEntry.toURL(), srcUrl: fileEntry.toURL(),dateStamp: sampleDate });
                    me.getStore().sync();
                }
                catch(Error)
                {
                    alert(Error.toString());
                }

             };


            function fail(error) {
                alert('Failed with error'+error.code);
            };


     }
     catch(E)
     {
        alert('Exception caught'+E.toString());
     }
    },

    //Saving the note when changed
    onNoteSave:function()
    {
        try{
            var me=this;
            this.getFe().createWriter(gotFileWriter, fail);

            function gotFileWriter(writer) {
                            
                //get the text from the text box
                var note=me.getTextcmp().getValue();

                writer.write(note);
            }

            function fail(error) {
                alert('failed with error '+error.code);
            }
        }catch(E)
        {
             alert('caught exception '+E.toString());
        }

    },

    onSettingButton:function(button, e, eOpts)
    {
        try{

            if(!this.settingsviewPanel)
            {
                this.settingsviewPanel=Ext.create('MediaSpace.view.SettingsView');
            }

            this.getMain().hide();
            this.settingsviewPanel.show();
        }
        catch(E)
        {
            alert('Exception caught in settings button'+E.toString());
        }


    },

    onChangeView:function(button,e,eOpts)
    {
        this.getListView().hide();
        this.getGridView().show();

        this.changeIconOnButtonTap(button,e,eOpts);

    },

    onSort:function()
    {
        try{
            if(this.sortFlag)
            {
                this.getStore().setGroupDir('DESC').sort();
                this.sortFlag=false;
            }
            else
            {
                this.getStore().setGroupDir('ASC').sort();
                this.sortFlag=true;
            }

            this.getStore().sort();
        }catch(E)
        {
             alert('caught exception '+E.toString());
        }

    },

    onSettingsBackButton: function(button, e, eOpts)
    {
        this.getSettingsviewPanel().hide();
        this.getMain().show();
    },

    onMetaDataViewPanelBack: function(button, e, eOpts)
    {
        this.getHtmlMetaComp().setHtml('');
          this.getMain().animateActiveItem(1,'flip');
    },

    onFilterBackButton: function(button, e, eOpts)
    {
        try{
            this.getSettingsviewPanel().show();
            this.getFilterviewPanel().hide();

            var values=this.getFilterviewPanel().getValues();
           
            var image=((values.img) ? "yes" : "no"),
            video=((values.video) ? "yes" : "no"),
            audio=((values.audio) ? "yes" : "no"),
            note=((values.note) ? "yes" : "no");

            // apply the changes done on the model which refreshes the capture list
            var store=this.getStore();

            store.clearFilter();

            store.filterBy(function(record){
                if((record.get('type')=='Image' && image=='yes')|| (record.get('type')=='Video' && video=='yes') || (record.get('type')=='Audio' && audio=='yes') ||(record.get('type')=='Note' && note=='yes'))
                {
                    return true;
                }
                else
                {
                    return false;
                }

            });
        }catch(E)
        {
            alert('Exception caught '+E.toString());
        }
    },


    settinglistTapped:function(list, index, target, record, e, eOpts)
    {
        try{
            if(!this.filterviewPanel)
            {
                this.filterviewPanel=Ext.create('MediaSpace.view.FilterView');
            }
             this.filterviewPanel.show();
        }
        catch(E)
        {
            alert('Exception caught'+E.toString());
        }
    },

    onInfoButton:function(button, e, eOpts)
    {
       this.getMain().animateActiveItem(2,'flip');
    }

});
