import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
  async pagination(model: Model<any>, params) {
    const { limit, offset, page } = params;
    const skip = limit * page - limit + offset;
    const documentsNumber = await model.countDocuments().exec();
    const numberOfPages = Math.ceil(documentsNumber / limit);
    const pagination = {
      totalItems: documentsNumber,
      page: params.page || 1,
      skip,
      numberOfPages,
    };
    return pagination;
  }
}
