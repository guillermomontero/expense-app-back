import { Request, Response } from 'express';
import User from '../models/user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    res.json({
      code: 1,
      msg: '',
      users
    });
  } catch (error) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};

export const getAllActiveUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ where: { active: true } });

    res.json({
      code: 1,
      msg: '',
      users
    });
  } catch (error) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    res.json({
      code: 1,
      msg: '',
      user
    });
  } catch (error) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const user = await User.create(body);

    res.json({
      code: 1,
      msg: '',
      user
    });
  } catch (error) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.json({ code: 2, msg: 'User not exists' });

    await user.update(body);

    res.json({
      code: 1,
      msg: '',
      user
    });
  } catch (err) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.json({ code: 2, msg: 'User not exists' });

    await user.update({ active: false });

    res.json({
      code: 1,
      msg: '',
      user
    });
  } catch (err) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};
