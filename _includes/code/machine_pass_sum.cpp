
double f(double * arr, int len)
{
    double sum = 1.0;
    for(int i = 0; i < len; ++i)
        sum += arr[i];
    return sum;
}
