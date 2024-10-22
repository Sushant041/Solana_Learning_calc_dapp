use anchor_lang::prelude::*;

declare_id!("A4jSUp4vSqH6KVrFXWvY23f1Cc1wMfXntKCqxN4MEfgj");

#[program]
pub mod mycalcdapp {
    use super::*;
    
    pub fn create(ctx: Context<Create>, init_message: String) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx: Context<Add>, num1: i64, num2: i64) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 + num2;
        Ok(())
    }

    pub fn subtract(ctx: Context<Subtract>, num1: i64, num2: i64) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 - num2;
        Ok(())
    }

    pub fn multiply(ctx: Context<Multiply>, num1: i64, num2: i64) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 * num2;
        Ok(())
    }
    pub fn divide(ctx: Context<Divide>, num1: i64, num2: i64) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 / num2;
        calc.remainder = num1 % num2;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 264)]
    pub calc: Account<'info, Calculator>, // Correctly defined as Account
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>, // This needs the correct import
}

#[derive(Accounts)]
pub struct Add <'info> {
    #[account(mut)]
    pub calc: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Subtract <'info> {
    #[account(mut)]
    pub calc: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Multiply <'info> {
    #[account(mut)]
    pub calc: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Divide <'info> {
    #[account(mut)]
    pub calc: Account<'info, Calculator>,
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}
