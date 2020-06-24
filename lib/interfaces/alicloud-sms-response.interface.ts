export interface AlicloudSmsResponse {
  /**
   * Request status code.
   * - Return ```OK``` means the message was sent successfully.
   * - Other errors see [error code list](https://help.aliyun.com/document_detail/101346.htm)
   *
   * @type {string}
   * @memberof AlicloudSmsResponse
   */
  Code: string;

  /**
   * Status code description.
   * - Return ```OK``` means the message was sent successfully.
   * - Other errors see [error code list](https://help.aliyun.com/document_detail/101346.htm)
   *
   * @type {string}
   * @memberof AlicloudSmsResponse
   */
  Message: string;

  /**
   * Send receipt ID.
   * ONLY the message was sent successfully, this field will be returned.
   *
   * @type {string}
   * @memberof AlicloudSmsResponse
   */
  BizId?: string;

  /**
   * Request ID.
   *
   * @type {string}
   * @memberof AlicloudSmsResponse
   */
  RequestId?: string;
}
