const NotesController = require("../controllers/NotesController")
const middleware = require("../middleware/jwtMiddleware")
module.exports = (app) => {

    app.route("/notes") 
        .post([middleware.verify_token,middleware.is_student],NotesController.note_create)
        .get([middleware.verify_token,middleware.is_admin],NotesController.fetch_notes) //utilisation des query params
        
    app.route("/:moduleId/notes")
        .get([middleware.verify_token,middleware.is_admin,middleware.is_teacher],NotesController.fetch_notes_module)
}