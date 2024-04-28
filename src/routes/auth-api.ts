import express from 'express'
import { UserController } from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'
import { practitionerMiddleware } from '../middleware/practitioner-middleware'
import { JournalController } from '../controller/journal-controller'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/users', UserController.get)
apiRouter.patch('/api/users', UserController.update)

// Journals API
apiRouter.post('/api/journals/', JournalController.create)