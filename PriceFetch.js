const ethers=require("ethers");
const {
    factoryAddress,
    routerAddress,
    fromAddress,
    toAddress
}=require("./AddressList");
const {
    erc20ABI,
    factoryABI,
    pairABI,
    routerABI
}=require("./Abiinfo");


const provider =new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");

const factoryInstance=new ethers.Contract(factoryAddress,factoryABI,provider);

const routerInstance=new ethers.Contract(routerAddress,routerABI,provider);

const fetchPrice=async(humanFormat)=>{

    const token1=new ethers.Contract(fromAddress,erc20ABI,provider);
    const token2=new ethers.Contract(toAddress,erc20ABI,provider);

    const decimal1=await token1.decimals();
    const decimal2=await token2.decimals();

    const amountIn=ethers.utils.parseUnits(humanFormat,decimal1).toString();
    const amountOut=await routerInstance.getAmountsOut(amountIn,[fromAddress,toAddress]);

    const humanRead=ethers.utils.formatUnits(amountOut[1],decimal2);
    console.log("the number of WBNB : ",humanRead);
    
}
humanFormat="100";
fetchPrice(humanFormat);

