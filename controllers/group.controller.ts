import { Request, Response } from 'express';
import Group from '../models/group.model';

export const getGroups = (req: Request, res: Response) => {
  res.json({ msg: 'getGroups' });
};

export const getGroup = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ msg: 'getGroup', id });
};

export const createGroup = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const group = await Group.create(body);

    res.json({
      code: 1,
      msg: '',
      group
    });
  } catch (error) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};

export const updateGroup = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({ msg: 'updateGroup', body, id });
};

export const deleteGroup = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ msg: 'deleteGroup', id });
};
