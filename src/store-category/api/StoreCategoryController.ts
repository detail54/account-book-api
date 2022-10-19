import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import StoreCategoryChangeService from '../service/StoreCategoryChangeService'
import StoreCategoryRetireveService from '../service/StoreCategoryRetireveService'
import StoreCategoryRegistDto from '../dto/StoreCategoryRegistDto'

export default class StoreCategoryController {
  private storeCategoryRetireveService: StoreCategoryRetireveService = new StoreCategoryRetireveService()
  private storeCategoryChangeService: StoreCategoryChangeService = new StoreCategoryChangeService()

  /**
   * -- 전체 카테고리 리스트 조회 --
   * @param req 요청
   * @param res 응답
   * @param next 다음 함수 호출
   * @returns res 객체
   */
  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const storeCategoryList = await this.storeCategoryRetireveService.getList()

      if (_.isEmpty(storeCategoryList)) {
        res.status(httpStatus.NO_CONTENT)
      } else {
        res.status(httpStatus.OK)
      }

      res.send(storeCategoryList)
    } catch (e) {
      next()
      throw e
    }

    return res
  }

  /**
   * -- 특정 카테고리 조회 --
   * @param req 요청
   * @param res 응답
   * @param next 다음 함수 호출
   * @returns res 객체
   */
  public get = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const storeCategory = await this.storeCategoryRetireveService.get(req.params.name)

      if (_.isEmpty(storeCategory)) {
        res.status(httpStatus.NO_CONTENT)
      } else {
        res.status(httpStatus.OK)
      }

      res.send(storeCategory)
    } catch (e) {
      next()
      throw e
    }

    return res
  }

  /**
   * -- 새 카테고리 등록 --
   * @param req 요청
   * @param res 응답
   * @param next 다음 함수 호출
   * @returns res 객체
   */
  public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const storeCategory: StoreCategoryRegistDto = req.body
      await this.storeCategoryChangeService.register(storeCategory)
    } catch (e) {
      next()
      throw e
    }

    res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode))
    return res
  }
}
