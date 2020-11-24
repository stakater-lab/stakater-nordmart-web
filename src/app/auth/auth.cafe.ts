import { Selector } from "testcafe";
import { byTestId, Page } from "../../../testcafe/helpers";
import { authTestUser } from "../../../testcafe/users";

fixture.skip`Authentication`.beforeEach(async (t) => {
  await t.navigateTo(Page.url).useRole(authTestUser);
});

test("should login using keycloak", async (t) => {
  await t.expect(Selector("h4").withExactText("OpenShift Clusters").exists).ok();
});

test("should logout", async (t) => {
  await t.click(byTestId("user-menu"));
  await t.click(Selector("li").withExactText("Sign out"));
  await t.expect(Selector("#kc-page-title").withExactText("Log In").exists).ok();
});
