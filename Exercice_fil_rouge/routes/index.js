// routes/index.js
var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Statistiques pour la page d'accueil
    const totalTasks = await db.tasks.count();
    const completedTasks = await db.tasks.count({ where: { status: 'completed' } });
    const pendingTasks = await db.tasks.count({ where: { status: 'pending' } });
    const totalTags = await db.Tags.count();
    
    // Tâches récentes
    const recentTasks = await db.tasks.findAll({
      include: [{ model: db.Tags, as: 'tags' }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    res.render('index', { 
      title: 'Tableau de bord - Gestion des tâches',
      totalTasks,
      completedTasks,
      pendingTasks,
      totalTags,
      recentTasks
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;