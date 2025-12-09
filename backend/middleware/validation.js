// Input validation and sanitization middleware

// Basic input sanitization to prevent XSS
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Validate memory input
const validateMemory = (req, res, next) => {
  const { title, description, date } = req.body;
  
  // Sanitize inputs
  req.body.title = sanitizeInput(title);
  req.body.description = sanitizeInput(description);
  
  // Validation
  const errors = [];
  
  if (!title || title.length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  
  if (title && title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }
  
  if (!description || description.length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  
  if (description && description.length > 1000) {
    errors.push('Description must be less than 1000 characters');
  }
  
  if (!date) {
    errors.push('Date is required');
  }
  
  if (date && isNaN(Date.parse(date))) {
    errors.push('Invalid date format');
  }
  
  if (req.body.tags && Array.isArray(req.body.tags)) {
    req.body.tags = req.body.tags.map(tag => sanitizeInput(tag)).filter(tag => tag.length > 0 && tag.length < 50);
  }
  
  if (req.body.imageUrl) {
    req.body.imageUrl = sanitizeInput(req.body.imageUrl);
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  
  next();
};

// Validate note input
const validateNote = (req, res, next) => {
  const { content } = req.body;
  
  req.body.content = sanitizeInput(content);
  
  const errors = [];
  
  if (!content || content.length < 3) {
    errors.push('Content must be at least 3 characters long');
  }
  
  if (content && content.length > 500) {
    errors.push('Content must be less than 500 characters');
  }
  
  if (req.body.emoji) {
    req.body.emoji = sanitizeInput(req.body.emoji);
    
    if (req.body.emoji.length > 10) {
      errors.push('Emoji must be less than 10 characters');
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  
  next();
};

// Validate bucket list item input
const validateBucketItem = (req, res, next) => {
  const { title, category } = req.body;
  
  req.body.title = sanitizeInput(title);
  
  if (category) {
    req.body.category = sanitizeInput(category);
  }
  
  const errors = [];
  
  if (!title || title.length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  
  if (title && title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }
  
  if (category && category.length > 50) {
    errors.push('Category must be less than 50 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  
  next();
};

// Validate open when letter input
const validateOpenWhenLetter = (req, res, next) => {
  const { occasion, content } = req.body;
  
  req.body.occasion = sanitizeInput(occasion);
  req.body.content = sanitizeInput(content);
  
  const errors = [];
  
  if (!occasion || occasion.length < 5) {
    errors.push('Occasion must be at least 5 characters long');
  }
  
  if (occasion && occasion.length > 200) {
    errors.push('Occasion must be less than 200 characters');
  }
  
  if (!content || content.length < 20) {
    errors.push('Content must be at least 20 characters long');
  }
  
  if (content && content.length > 2000) {
    errors.push('Content must be less than 2000 characters');
  }
  
  if (req.body.emoji) {
    req.body.emoji = sanitizeInput(req.body.emoji);
    
    if (req.body.emoji.length > 10) {
      errors.push('Emoji must be less than 10 characters');
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  
  next();
};

module.exports = {
  validateMemory,
  validateNote,
  validateBucketItem,
  validateOpenWhenLetter,
  sanitizeInput,
};

