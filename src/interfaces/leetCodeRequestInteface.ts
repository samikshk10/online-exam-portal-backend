import Leetcode from "leetcode-api-typescript/dist/cjs/lib/leetcode";

export interface AuthenticatedRequest extends Request {
  leetcode?: Leetcode;
}
