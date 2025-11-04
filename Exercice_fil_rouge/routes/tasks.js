// routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// GET - Liste toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await db.tasks.findAll({
      include: [
        { model: db.User, as: 'user' },
        { model: db.Tag, as: 'tags' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.render('tasks/index', { 
      title: 'Liste des tâches',
      tasks: tasks 
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: 'Erreur',
      message: 'Erreur lors de la récupération des tâches' 
    });
  }
});

// GET - Formulaire de création d'une tâche
router.get('/new', async (req, res) => {
  try {
    const tags = await db.Tag.findAll({ where: { isActive: true } });
    const users = await db.User.findAll();
    
    res.render('tasks/new', { 
      title: 'Nouvelle tâche',
      tags: tags,
      users: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: 'Erreur',
      message: 'Erreur lors du chargement du formulaire' 
    });
  }
});

// POST - Créer une nouvelle tâche
router.post('/', async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, tagIds, userId } = req.body;
    
    const tasks = await db.tasks.create({
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      userId: userId || null
    });
    
    // Associer les tags si fournis
    if (tagIds) {
      const tagIdsArray = Array.isArray(tagIds) ? tagIds : [tagIds];
      await tasks.setTags(tagIdsArray);
    }
    
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: 'Erreur',
      message: 'Erreur lors de la création de la tâche' 
    });
  }
});

// GET - Afficher une tâche spécifique
router.get('/:id', async (req, res) => {
  try {
    const tasks = await db.tasks.findByPk(req.params.id, {
      include: [
        { model: db.User, as: 'user' },
        { model: db.Tag, as: 'tags' }
      ]
    });
    
    if (!tasks) {
      return res.status(404).render('error', { 
        title: 'Tâche non trouvée',
        message: 'Cette tâche n\'existe pas' 
      });
    }
    
    res.render('tasks/show', { 
      title: `Tâche: ${tasks.title}`,
      tasks: tasks 
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: 'Erreur',
      message: 'Erreur lors de la récupération de la tâche' 
    });
  }
});

module.exports = router;