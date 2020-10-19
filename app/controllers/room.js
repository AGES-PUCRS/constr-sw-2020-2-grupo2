const { schema } = require('../../config/schemas/schemas')
const querystring = require('querystring');

module.exports = function(app){
    var Room = app.models.room;

    var controller = {

        newRoom:function(req,res){
            const room = new Room(req.body);
            room.save(function(err,room){
                console.log(err);

                if(err)
                    res.status(500).end();
                else
                    res.json(room);
            });
        },

        remove: function(req,res){
            const id = req.params.id;

            Room.deleteOne({_id: id}, function(err){
            if(!err)
                res.json({message: 'sucess'});
            else
                res.status(500).end();
            })
        },

        room: async function(req,res){
            const id = req.params.id;
            const response = await Room.findById(id).exec();
            console.log(id)
            console.log(response)
            res.json(response)
        },

        getByAtribute: function(req,res){
            const atribute = req.params.atribute;
            Room.find(req.query, function(err, data){
                if(err) console.log(err)
                res.json(data)
            });
        },

        updateRoomAll: function(req,res){
            let { error } = schema.validate(req.body)
            if (error) return res.status(400).send(error.details)
            const id = req.params.id;
            const query = req.body
            try{
                Room.findOneAndUpdate({_id:id},query).exec();
            }catch{
                res.sendStatus(404)
            }
            console.log(id)
            res.json("sucess")
        },

        updateRoom: function(req,res){

            const id = req.params.id;
            const query = req.body
            try{
                Room.findOneAndUpdate({_id:id},query).exec();
            }catch{
                res.sendStatus(404)
            }
            console.log(id)
            res.send("sucess")
        }
        
    
    }

    return controller;
}