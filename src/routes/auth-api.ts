import express from 'express'
import { UserController } from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'
import { JournalController } from '../controller/journal-controller'
import { DiscussionController } from '../controller/discussion-controller'
import { CommentController } from '../controller/comment-controller'
import { UserDataController } from '../controller/userData-controller'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/users', UserController.get)
apiRouter.patch('/api/users', UserController.update)

// Journals API
apiRouter.post('/api/journals/', JournalController.create)
apiRouter.get('/api/journals/', JournalController.list)
apiRouter.get('/api/journals/moods', JournalController.moodCount)
apiRouter.get('/api/journals/:id', JournalController.get)
apiRouter.put('/api/journals/:id', JournalController.update)
apiRouter.delete('/api/journals/:id', JournalController.delete)

// Journal AI API
apiRouter.get('/api/journals/:id/analysis', JournalController.journalAI)
apiRouter.put('/api/journals/:id/analysis', JournalController.updateJournalAI)


// Discussion API
apiRouter.post('/api/discussions/', DiscussionController.create)
apiRouter.get('/api/discussions/', DiscussionController.list)
apiRouter.get('/api/discussions/current', DiscussionController.listByUser)
apiRouter.get('/api/discussions/popular', DiscussionController.listPopular)
apiRouter.get('/api/discussions/liked', DiscussionController.listLiked)
apiRouter.get('/api/discussions/:id', DiscussionController.get)
apiRouter.put('/api/discussions/:id', DiscussionController.update)
apiRouter.delete('/api/discussions/:id', DiscussionController.delete)

// Discussion Like
apiRouter.post('/api/discussions/:id/like', DiscussionController.like)

// Comment API
apiRouter.post('/api/discussions/:discussionId/comments', CommentController.create)
apiRouter.get('/api/discussions/:discussionId/comments', CommentController.list)
apiRouter.get('/api/discussions/:discussionId/comments/:commentId', CommentController.get)
apiRouter.put('/api/discussions/:discussionId/comments/:commentId', CommentController.update)
apiRouter.delete('/api/discussions/:discussionId/comments/:commentId', CommentController.delete)

// User Data API
apiRouter.post('/api/user_data', UserDataController.create)
apiRouter.get('/api/user_data', UserDataController.get)
apiRouter.put('/api/user_data', UserDataController.update)


