/* 
* @Author: daniel
* @Date:   2015-12-17 15:08:01
* @Last Modified by:   daniel
* @Last Modified time: 2015-12-17 15:24:20
*/

'use strict';
var mStudent=Backbone.Model.extend({
    defaults:{
        Code:'',
        Name:'',
        Score:''
    }
});

var cStudentList=Backbone.Collection.extend({
    initialize:function(model,options){
        this.on("add",options.view.showModel);
    }
});

var vStudentView=Backbone.View.extend({
    el:$("body"),
    initialize:function(){
        this.stu1=new cStudentList(null,{view:this})
    },
    events:{
        'click #btnSubmit':'addModel'
    },
    addModel:function(){
        var stu=new mStudent({
            Code:$('#txtCode').val(),
            Name:$('#txtName').val(),
            Score:$('#txtScore').val()
        });
        this.stu1.add(stu);
    },
    showModel:function(model){
        this.template=_.template($('#stus-tpl').html());
        $('#ulshowstus').append(this.template(model.toJSON()));
    }
});
var stuv=new vStudentView();