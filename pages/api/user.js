import main from '../../util/schema'
import UserModel from '../../util/schema'

export default function get_Users(req,res){
    main()

    const create = new UserModel({
        name:'john smith'
    })

    create.save().then(()=>{
        res.status(200).json(create)
    })
}