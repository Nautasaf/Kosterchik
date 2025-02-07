const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const { User } = require('../db/models')

// Конфигурация Multer для сохранения файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(`${__dirname}/../uploads`)) // Папка, куда будут сохраняться файлы
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Имя файла
  },
})

const upload = multer({ storage: storage })

router.put('/profile/photo', upload.single('avatar'), async (req, res) => {
  if (!req.session.loginedUser) {
    return res.status(403).json({ error: 'Доступ запрещен' })
  }
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const user = await User.findByPk(req.session.loginedUser.id)
    
    if (!user) {
      return res.status(403).json({ error: 'Доступ запрещен' })
    }

    const fileUrl = `/uploads/${req.file.filename}`

    // Если нужно сохранить URL фото в базе данных

    user.photoUrl = fileUrl
    await user.save()

    return res.status(200).json(user)
  } catch (error) {
    console.error('Ошибка при обновлении фото пользователя:', error)
  }
})

router.post(
  '/uploads/background',
  upload.single('backgroundImage'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: '====> Файл не загружен!!!!!' })
    }
    const fileUrl = `/uploads/${req.file.filename}`

    return res.status(200).json({ imageUrl: fileUrl })
  },
)

router.get('/uploads/:filename', (req, res) => {
  console.log('uploads!!!')

  const { filename } = req.params
  const filePath = path.join(`${__dirname}/../uploads`, filename)

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('!!!Файл не найден!!!')
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Ошибка при отправке файла:', err)
      res.status(404).send('Файл не найден')
    }
  })
})

module.exports = router