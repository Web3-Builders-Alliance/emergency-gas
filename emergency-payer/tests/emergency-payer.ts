import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { EmergencyPayer } from "../target/types/emergency_payer";
import * as web3 from "@solana/web3.js"
import { assert } from "chai";

describe("emergency-payer", async () => {
  // Configure the client to use the local cluster.
  const anchorProvider = anchor.AnchorProvider.env();
  anchor.setProvider(anchorProvider);
  const program = anchor.workspace.EmergencyPayer as Program<EmergencyPayer>;

  it("Is initialized!", async () => {
    // Add your test here.
    const [treasury] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("treasury"),],
      program.programId,
    )
    const tx = await program.methods
      .initialize()
      .accounts({
        treasury,
        payer: anchorProvider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);

    const account = await program.account.treasury.fetch(treasury)
    console.log(account);
    assert.isObject(account);
  });

});
