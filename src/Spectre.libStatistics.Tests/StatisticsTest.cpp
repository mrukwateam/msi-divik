/*
* StatisticsTest.cpp
* Tests basic vector statistics.
*
Copyright 2017 Grzegorz Mrukwa

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

#include <gtest/gtest.h>
#include <gmock/gmock-matchers.h>
#include "Spectre.libStatistics/Statistics.h"

namespace
{
using namespace testing;
using namespace Spectre::libStatistics::simple_statistics;

using Data = const std::vector<double>;

Data dataStorage{ 1,2,3 };
auto data = gsl::as_span(dataStorage);
Data emptyStorage{};
auto empty = gsl::as_span(emptyStorage);

TEST(SumTest, calculates_vector_sum)
{
    EXPECT_THAT(Sum(data), 6.);
}

TEST(SumTest, sum_of_empty_is_zero)
{
    EXPECT_THAT(Sum(empty), 0.);
}

TEST(MeanTest, calculates_vector_mean)
{
    EXPECT_THAT(Mean(data), 2.);
}

TEST(MeanTest, mean_of_empty_is_zero)
{
    EXPECT_THAT(Mean(empty), 0.);
}

TEST(VarianceTest, calculates_unbiased_vector_variance_by_default)
{
    EXPECT_THAT(Variance(data), DoubleEq(1.0));
}

TEST(VarianceTest, calculates_biased_vector_variance_on_demand)
{
    EXPECT_THAT(Variance(data, false), DoubleEq(2. / 3.));
}

TEST(VarianceTest, variance_of_empty_is_zero)
{
    EXPECT_THAT(Variance(empty), DoubleEq(0.));
    EXPECT_THAT(Variance(empty, false), DoubleEq(0.));
}

TEST(MeanAbsoluteDeviationTest, calculates_mean_absolute_deviation_of_vector)
{
    EXPECT_THAT(MeanAbsoluteDeviation(data), DoubleEq(2. / 3.));
}

TEST(MeanAbsoluteDeviationTest, mean_absolute_deviation_of_empty_is_zero)
{
    EXPECT_THAT(MeanAbsoluteDeviation(empty), 0.);
}
}