import Joi from "joi";
import validationMessages from "../utils/validationMessages.js";

class BlogValidation {
  
  // Create Blog Schema
  static createBlogSchema = Joi.object({
    title: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(200)
      .messages(validationMessages.blog.title),
    
    description: Joi.string()
      .required()
      .trim()
      .min(10)
      .max(500)
      .messages(validationMessages.blog.description),
    
    body: Joi.string()
      .required()
      .trim()
      .min(50)
      .messages(validationMessages.blog.body),
    
    tags: Joi.array()
      .items(Joi.string().trim().lowercase())
      .max(10)
      .default([])
      .messages(validationMessages.blog.tags),
    
    state: Joi.string()
      .valid('draft', 'published')
      .default('draft')
      .messages(validationMessages.blog.state),
  }).options({
    abortEarly: false,
    stripUnknown: true
  });

  // Update Blog Schema
  static updateBlogSchema = Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(200)
      .messages(validationMessages.blog.title),
    
    description: Joi.string()
      .trim()
      .min(10)
      .max(500)
      .messages(validationMessages.blog.description),
    
    body: Joi.string()
      .trim()
      .min(50)
      .messages(validationMessages.blog.body),
    
    tags: Joi.array()
      .items(Joi.string().trim().lowercase())
      .max(10)
      .messages(validationMessages.blog.tags),
    
    state: Joi.string()
      .valid('draft', 'published')
      .messages(validationMessages.blog.state),
  }).options({
    abortEarly: false,
    stripUnknown: true
  }).min(1);

  // Update Blog State Schema (for publishing/unpublishing)
  static updateStateSchema = Joi.object({
    state: Joi.string()
      .required()
      .valid('draft', 'published')
      .messages(validationMessages.blog.state),
  }).options({
    abortEarly: false,
    stripUnknown: true
  });
}

export default BlogValidation;