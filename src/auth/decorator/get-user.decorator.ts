import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserMe = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        console.log('getUserMe')
        if(data){
            return request.user[data]
        }
        return request.user;
    },
);