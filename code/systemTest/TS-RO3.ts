import {Selector} from 'testcafe';

fixture('TS-RO3').page("http://localhost:8080");

test('TS-RO3', async function(t) {
    await t
        .click("#toProgress")
        .typeText("#sentence","Le rose sono rosse")
        .click("button.btn.btn-primary.my-2.my-sm-0.w-25")
        .expect(Selector(".container>div.col-sm-12>ul.list-group>li.list-group-item:not(.active)>div.row>div.col-sm-9").innerText).eql("Le rose sono rosse");
});