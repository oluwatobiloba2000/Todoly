const fetchSingleUser = async (model, email) =>{
   return await model.users.findOne( {
        where: {
          email
        }
    });
}

const fetchUserWithCollection = async (model, email)=>{
    return await model.users.findOne( {
        where: {
          email
        },
        include: [
            {
              model: model.collections,
              as: "collection"
            },
          ],
      });
}

const fetchSingleUserById = async (model, id) =>{
    return await model.users.findOne( {
         where: {
           id
         }
     });
 }
 
module.exports ={
    fetchSingleUser,
    fetchUserWithCollection,
    fetchSingleUserById
}