import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Mycalcdapp } from "../target/types/mycalcdapp";
import { assert } from "chai"
const { SystemProgram } = anchor.web3

describe('mycalcdapp', () =>{
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const calc = anchor.web3.Keypair.generate()
    const program = anchor.workspace.Mycalcdapp
    // console.log(program)
    it('Creates a calculator', async () =>{
        // await program.methods
        //     .create("Welcome to Solana")
        //     .accounts({
        //         calc: calc.publicKey,
        //         user: provider.wallet.publicKey,
        //         systemProgram: SystemProgram.programId,
        //     })
        //     .signers([calc])
        //     .rpc();

        await program.rpc.create("Welcome to Solana", {
          accounts: {
            calc: calc.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [calc]
        })

        const account = await program.account.calculator.fetch(calc.publicKey)

        assert.strictEqual(account.greeting, "Welcome to Solana");
    })

    it("Adds two numbers", async() =>{
      // await program.methods
      // .add(new anchor.BN(4), new anchor.BN(7))
      // .accounts({
      //   calc: calc.publicKey,
      // }).rpc();

      await program.rpc.add(new anchor.BN(2), new anchor.BN(5), {
        accounts:{
          calc: calc.publicKey,
        }
      })

      const account = await program.account.calculator.fetch(calc.publicKey)
      console.log(account.result.toNumber());

      assert.isTrue(account.result.eq(new anchor.BN(2 + 5)));
    })


    it("Subtracts two numbers", async() =>{
      await program.rpc.subtract(new anchor.BN(2), new anchor.BN(5), {
        accounts:{
          calc: calc.publicKey,
        }
      })

      const account = await program.account.calculator.fetch(calc.publicKey)
      console.log(account.result.toNumber());

      assert.isTrue(account.result.eq(new anchor.BN(2 - 5)));
    })

    it("Multiply two numbers", async() =>{
      await program.rpc.multiply(new anchor.BN(2), new anchor.BN(5), {
        accounts:{
          calc: calc.publicKey,
        }
      })

      const account = await program.account.calculator.fetch(calc.publicKey)
      console.log(account.result.toNumber());

      assert.isTrue(account.result.eq(new anchor.BN(2 * 5)));
    })

    it("Divide two numbers", async() =>{
      await program.rpc.divide(new anchor.BN(2), new anchor.BN(5), {
        accounts:{
          calc: calc.publicKey,
        }
      })

      const account = await program.account.calculator.fetch(calc.publicKey)
      console.log(account.result.toNumber());
      console.log(account.remainder.toNumber());

      assert.isTrue(account.result.eq(new anchor.BN(2 / 5)));
      assert.isTrue(account.remainder.eq(new anchor.BN(2 % 5)));
    })
});