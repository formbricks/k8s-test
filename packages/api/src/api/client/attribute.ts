import { type TAttributeUpdateInput } from "@formbricks/types/attributes";
import { type Result } from "@formbricks/types/error-handlers";
import { type ApiErrorResponse } from "@formbricks/types/errors";
import { makeRequest } from "../../utils/make-request";

export class AttributeAPI {
  private appUrl: string;
  private environmentId: string;

  constructor(appUrl: string, environmentId: string) {
    this.appUrl = appUrl;
    this.environmentId = environmentId;
  }

  async update(
    attributeUpdateInput: Omit<TAttributeUpdateInput, "environmentId">
  ): Promise<Result<{ changed: boolean; message: string; messages?: string[] }, ApiErrorResponse>> {
    // transform all attributes to string if attributes are present into a new attributes copy
    const attributes: Record<string, string> = {};
    for (const key in attributeUpdateInput.attributes) {
      attributes[key] = String(attributeUpdateInput.attributes[key]);
    }

    return makeRequest(
      this.appUrl,
      `/api/v1/client/${this.environmentId}/contacts/${attributeUpdateInput.userId}/attributes`,
      "PUT",
      { attributes }
    );
  }
}
