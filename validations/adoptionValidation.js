const{check, validationResult}=require('express-validator');

const generateAdoptionValidators= ()=>[
    check('user_id').notEmpty().isLength({max:50}).withMessage("Invalid user_id"),
    check('pet_id').notEmpty().isLength({max:50}).withMessage("Invalid pet_id"),
    check('date').isDate().notEmpty().withMessage("Invalid date")
]

const updateAdoptionValidators= () =>[
    check('id').notEmpty().isNumeric().withMessage("invalid id"),
    check('user_id').optional().isLength().withMessage("Invalid user_id"),
    check('pet_id').optional().isLength().withMessage("Invalid pet_id"),
    check('date').optional().isDate().withMessage("Invalid date")
]
const generateIdValidators=()=>[
    check('id').notEmpty().isNumeric().withMessage("invalid id")
]

const reporter = (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            "success":false,
            "code": 400,
            "message": errors,
            "data":[]

        })
    }
    next();
}


module.exports={
    add: [
    generateAdoptionValidators(),
    reporter
] ,
id: [
    generateIdValidators(),
    reporter
],
update: [
    updateAdoptionValidators(),
    reporter
]

}
