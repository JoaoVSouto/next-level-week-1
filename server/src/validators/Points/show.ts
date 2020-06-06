import Joi from '@hapi/joi';

export default Joi.object().keys({
  id: Joi.number().required(),
});
