import express from 'express'
import { UserController } from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'
import { practitionerMiddleware } from '../middleware/practitioner-middleware'
import { JournalController } from '../controller/journal-controller'
import { DiscussionController } from '../controller/discussion-controller'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/users', UserController.get)
apiRouter.patch('/api/users', UserController.update)

// Journals API
apiRouter.post('/api/journals/', JournalController.create)
apiRouter.get('/api/journals/', JournalController.list)
apiRouter.get('/api/journals/:id', JournalController.get)
apiRouter.put('/api/journals/:id', JournalController.update)
apiRouter.delete('/api/journals/:id', JournalController.delete)

// Discussion API
apiRouter.post('/api/discussions/', DiscussionController.create)
