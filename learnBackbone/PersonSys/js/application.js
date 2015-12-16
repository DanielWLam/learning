/* 
* @Author: daniel
* @Date:   2015-12-16 12:47:08
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-16 12:48:40
*/

'use strict';
$(function(){
    var Person=Backbone.Model.extend({
        defaults{
            name:'',
            sex:'',
            email:''
        },
        search:function(key){
            if(typeof key === 'undefined' || key === null || key === ''){
                return true;
            }
            key=key.toLowerCase();
            return this.get('name').toLowerCase().indexOf(key)!=-1||
                    this.get('email').toLowerCase().indexOf(key)!=-1;
        }
    });

    var Person = Backbone.Collection.extend({
        model:Person,
        localStorage:new Store('person-data')
    });

    var PersonItemView = Backbone.View.extend({
        className:'item',
        template:_.template($('#tpl-item').html()),
        events:{
            'click':'select'
        },
        initialize:function(){
            _.bindAll(this,'select');
            this.model.bind('reset',this.render,this);
            this.model.bind('change',this.render,this);
            this.model.bind('destroy',this.render,this);
            if(this.model.view){
                this.model.view.remove();
            }
            this.model.view=this;
        },
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        select:function(){
            appRouter.navigate('person/'+this.model.cid,{
                trigger:true
            });
        },
        sele:function(){
            this.$el.addClass('sele');
        },
        desele:function(){
            this.$el.removeClass('sele');
        }
    })
})